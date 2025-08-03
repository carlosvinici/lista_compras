import { Box, Button, Flex, Heading, IconButton, Stack, Tabs, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toaster } from '../components/ui/toaster';
import Modal from '../components/ui/modal';
import RegisterProduct from '../components/ProductForm/RegisterProduct';
import AddShop, { IFormData } from '../components/ProductForm/AddShop';
import { MdDeleteOutline } from 'react-icons/md';

const Home = () => {
  const [products, setProducts] = useState<IFormData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IFormData>();
  const [open, setOpen] = useState(false);
  const [openAddShop, setOpenAddShop] = useState(false);
  const [tabs, setTabs] = useState("products");
  
  useEffect(()=>{
    refreshData()
  }, [])

  function getData():IFormData[]{
    const getProducts = localStorage.getItem('products')||'[]';
    try {
      const parseProducts = JSON.parse(getProducts)
      return parseProducts
    } catch (error:any) {
      console.log('Error ao recuperar sua lista. ', error)
      toaster.create({
        title: "Error ao recuperar sua lista.",
        description: error?.message||'',
        type: "error",
      })
      return []
    }
  }

  function refreshData() {
    const data = getData()
    setProducts((prev)=>{
      return [...data]
    })
  }

  function handleDeselectProduct(id:string): void {
    const data = getData()
    const indexProduct = data?.findIndex(product=>product.id===id)
    data[indexProduct].isChecked = false;
    localStorage.setItem('products', JSON.stringify(data))
    refreshData()
  }

  function handleDeleteProduct(id:string): void {
    const data = getData()
    const removedItem = data?.filter(product=>product.id!=id)
    localStorage.setItem('products', JSON.stringify(removedItem))
    refreshData()
  }

  function totalPrice(){
    const calc = (price:number, kg:number, qtd:number ) => price ? ((kg || qtd)||1) * price : 0
    let totalPrice = 0;
    if(tabs=='products'){
      products.forEach(prodt=>{
        totalPrice += calc(prodt?.price||0, prodt?.kg||0, prodt?.qtd||0)
      })
    } else if(tabs=='shop'){
      products.filter(prodt=>prodt?.isChecked)?.forEach(prodt=>{
        totalPrice += calc(prodt?.price||0, prodt?.kg||0, prodt?.qtd||0)
      })
    }
    return totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
  }

  return (
    <Flex flexDir={"column"} h="100vh" w="100%" m="0" p="0px 10px" justify={"space-between"} align={""} textAlign="center">
      <Tabs.Root value={tabs} onValueChange={(e) => setTabs(e.value)}>
        <Tabs.List display="flex" justifyContent="center">
          <Tabs.Trigger value="products">
            Produtos
          </Tabs.Trigger>
          <Tabs.Trigger value="shop">
            Carrinho
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="products" m="0" p="0">
          <Heading as="h1" size="2xl" mb={4} mt={2}>
            Lista de produtos
          </Heading>
          <Flex flexDir="column" w="100%" align="center" gap='2'>
            {
              products?.map((product)=>{
                return (
                  <Flex 
                    key={product?.id}
                    align={"center"}
                    justify={"center"}
                    w="100%" 
                    maxW={"500px"}
                    borderRadius={"10px"}
                  >
                  <Button 
                    key={product?.id} 
                    size="xs" 
                    w={"90%"} 
                    variant="surface"
                    colorPalette={product?.isChecked?"green":"blue"}
                    maxW='500px' 
                    onClick={()=>{
                      setSelectedProduct(product);
                      setOpenAddShop(true)
                    }}
                  >
                    {product?.name}
                  </Button>
                  <IconButton 
                    size="xs" 
                    w="10%"
                    color="red.300"
                    borderRadius={"10px"}
                    variant="ghost"
                    onClick={()=>handleDeleteProduct(product.id)}
                    _hover={{color: "red.500"}}
                  >
                    <MdDeleteOutline />
                  </IconButton >
                  </Flex>
                )
              })
            }
          </Flex>
          <Modal
            trigger={<Button colorScheme={"green"}>Registrar novo produto</Button>}
            title='Registrar Produto'
            setStateModal={setOpen}
            stateModal={open}
          >
            <RegisterProduct actionSubmitForm={()=>{
              refreshData();
              setOpen(false)
            }} />
          </Modal>

          <Modal
            title='Confirme os Dados'
            setStateModal={setOpenAddShop}
            stateModal={openAddShop}
          >
            <AddShop defaultValues={{
              name: selectedProduct?.name||'', 
              description: selectedProduct?.description||'', 
              kg: selectedProduct?.kg||0, 
              price: selectedProduct?.price||0, 
              qtd: selectedProduct?.qtd||0,
              id: selectedProduct?.id||'',
              isChecked: selectedProduct?.isChecked||false,
              typeProduct: selectedProduct?.typeProduct||'uni'
            }} 
              actionSubmitForm={()=>{
                refreshData();
                setOpenAddShop(false)
              }} 
            />
          </Modal>
        </Tabs.Content>

        <Tabs.Content value="shop" m="0" p="0">
          <Heading as="h1" size="2xl" mb={4}  mt={2}>
            Produtos no carrinho
          </Heading>
          <Flex flexDir="column" w="100%" align="center" gap='2' mb="2">
            {
              products?.filter(product=>product?.isChecked)?.map((product)=>{
                return (
                  <Flex 
                    key={product?.id}
                    align={"center"}
                    justify={"center"}
                    w="100%" 
                    maxW={"500px"}
                    borderRadius={"10px"}
                  >
                    <Button
                      size="xs" 
                      w={"90%"}
                      borderRadius={"10px"}
                      colorPalette="green"
                      variant="surface"
                      onClick={()=>{
                        setSelectedProduct(product);
                        setOpenAddShop(true)
                      }}
                    >
                      {product?.name}
                    </Button>
                    <IconButton 
                      size="xs" 
                      w="10%"
                      color="red.300"
                      borderRadius={"10px"}
                      variant="ghost"
                      onClick={()=>handleDeselectProduct(product.id)}
                      _hover={{color: "red.500"}}
                    >
                      <MdDeleteOutline />
                    </IconButton >
                  </Flex>
                )
              })
            }

          </Flex>
        </Tabs.Content>

      </Tabs.Root>
      
      <Box borderTop={"1px solid"} borderColor="gray.800" pt="2" pb={"10"}>
        <Flex justify="space-between" p="0px 15px">
          <Text>Qtd. Itens</Text>
          <Text>{tabs=="products"?products?.length:products?.filter(product=>product?.isChecked)?.length}</Text>
        </Flex>
        <Flex justify="space-between" p="0px 15px">
          <Text>Total R$</Text>
          <Text>
            {totalPrice()} 
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;
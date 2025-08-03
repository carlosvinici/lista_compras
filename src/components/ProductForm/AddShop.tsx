import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  Textarea,
  Stack,
  Field,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import SelectTypeProduct from "./selectTypeProduct";

export type IFormData = {
  id: string;
  name: string;
  kg: number;
  qtd: number;
  price: number;
  description: string;
  isChecked: boolean;
  typeProduct: 'uni'|'kg'
};

type PropsAddShop = {
    defaultValues: IFormData;
    actionSubmitForm:()=>void
}

export default function AddShop({defaultValues, actionSubmitForm}:PropsAddShop) {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<IFormData>();
    const [ typeProduct, setTypeProduct ] = useState<'uni'|'kg'>('uni')

    useEffect(()=>{
        setValue("description", defaultValues?.description)
        setValue("kg", defaultValues?.kg||0)
        setValue("name", defaultValues?.name)
        setValue("price", defaultValues?.price||0)
        setValue("qtd", defaultValues?.qtd||0)
        setTypeProduct(defaultValues?.typeProduct||'uni')
    }, [defaultValues])

    const onSubmit = (data: IFormData) => {
        const products = JSON.parse(localStorage.getItem("products") || "[]") as IFormData[];
        const indexProduct = products.findIndex((prodct)=>prodct.name === data?.name);
        products[indexProduct].description = data?.description;
        products[indexProduct].kg = Number(data?.kg);
        products[indexProduct].price = Number(data?.price);
        products[indexProduct].qtd = Number(data?.qtd);
        products[indexProduct].isChecked = true; 
        products[indexProduct].typeProduct = typeProduct; 
        localStorage.setItem("products", JSON.stringify(products));
        reset();
        actionSubmitForm();
    };

    return (
        <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={4}>
                <Field.Root required invalid={!!errors.name}>
                    <Field.Label>Nome do Produto</Field.Label>
                    <Input
                    {...register("name", { required: "Campo obrigatório" })}
                    placeholder="Nome do produto"
                    />
                </Field.Root>

                <SelectTypeProduct setTypeProduct={setTypeProduct} typeProduct={typeProduct} />  

                {
                    typeProduct=='uni'?(
                        <Field.Root>
                            <Field.Label>
                                Quantidade
                            </Field.Label>
                            <Input {...register("qtd", { required: "Campo obrigatório" })} placeholder="Quantidade" />
                        </Field.Root>
                    ):typeProduct=='kg'?(
                        <Field.Root>
                            <Field.Label>
                                Kg
                            </Field.Label>
                            <Input {...register("kg", { required: "Campo obrigatório" })} placeholder="Kg" />
                        </Field.Root>
                    ):<></>

                }

                
                <Field.Root>
                    <Field.Label>
                        Valor ( 1 Unidade ou 1 Kg )
                    </Field.Label>
                    <Input {...register("price", { required: "Campo obrigatório" })} type="number" step="0.01" placeholder="0.0" />
                </Field.Root>

                <Field.Root>
                    <Field.Label>
                        Descrição
                        <Field.RequiredIndicator
                            fallback={
                                <Badge size="xs" variant="surface">
                                    Optional
                                </Badge>
                            }
                        />
                    </Field.Label>
                    <Textarea {...register("description")} placeholder="Descrição" />
                </Field.Root>

                <Button colorPalette="green" type="submit">
                    Adicionar no carrinho
                </Button>
                </Stack>
            </form>
        </Box>
    );
}
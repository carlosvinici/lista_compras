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
import { useState } from "react";
import SelectTypeProduct from "./selectTypeProduct";
import { IFormData } from "./AddShop";

type PropsRegisterProduct = {
    actionSubmitForm:()=>void
}

export default function RegisterProduct({actionSubmitForm}:PropsRegisterProduct) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormData>();
  const [ typeProduct, setTypeProduct ] = useState<'uni'|'kg'>('uni')
  
  const onSubmit = (data: IFormData) => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const newProduct:IFormData = {
      name: data.name,
      qtd: data?.qtd? Number(data?.qtd) : 0,
      kg: data?.kg? Number(data?.kg) : 0,
      price: data?.price? Number(data?.price) : 0,
      id: uuidv4(),
      isChecked: false,
      description: data?.description||'',
      typeProduct: typeProduct
    };
    localStorage.setItem("products", JSON.stringify([...products, newProduct]));
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
                        <Input {...register("qtd", { required: "Campo obrigatório" })} placeholder="Quantidade" type="number" step="0.01"/>
                    </Field.Root>
                ):typeProduct=='kg'?(
                    <Field.Root>
                        <Field.Label>
                            Kg
                        </Field.Label>
                        <Input {...register("kg", { required: "Campo obrigatório" })} placeholder="Kg" type="number" step="0.01" />
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

            <Button colorScheme="teal" type="submit">
                Salvar
            </Button>
            </Stack>
        </form>
    </Box>
  );
}

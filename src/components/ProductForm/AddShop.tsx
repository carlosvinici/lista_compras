import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  Textarea,
  Stack,
  Field,
  Badge,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

type FormData = {
  name: string;
  kg: number;
  qtd: number;
  price: number;
  description?: string;
  isChecked?: boolean;
};

type PropsAddShop = {
    defaultValues: {
        name: string;
        kg?: number;
        qtd?: number;
        price?: number;
        description?: string;
    };
    actionSubmitForm:()=>void
}

export default function AddShop({defaultValues, actionSubmitForm}:PropsAddShop) {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormData>();
  
    useEffect(()=>{
        setValue("description", defaultValues?.description)
        setValue("kg", defaultValues?.kg||0)
        setValue("name", defaultValues?.name)
        setValue("price", defaultValues?.price||0)
        setValue("qtd", defaultValues?.qtd||0)
    }, [defaultValues])

    const onSubmit = (data: FormData) => {
        const products = JSON.parse(localStorage.getItem("products") || "[]") as FormData[];
        const indexProduct = products.findIndex((prodct)=>prodct.name === data?.name);
        products[indexProduct].description = data?.description;
        products[indexProduct].kg = Number(data?.kg);
        products[indexProduct].price = Number(data?.price);
        products[indexProduct].qtd = Number(data?.qtd);
        products[indexProduct].isChecked = true; 
        localStorage.setItem("products", JSON.stringify(products));
        reset();
        actionSubmitForm();
    };

    return (
        <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={4}>
                <Field.Root required disabled invalid={!!errors.name}>
                    <Field.Label>Nome do Produto</Field.Label>
                    <Input
                    {...register("name", { required: "Campo obrigatório" })}
                    placeholder="Nome do produto"
                    />
                </Field.Root>

                <Field.Root>
                    <Field.Label>
                        Kg
                        <Field.RequiredIndicator
                            fallback={
                                <Badge size="xs" variant="surface">
                                    Optional
                                </Badge>
                            }
                        />
                    </Field.Label>
                    <Input {...register("kg")} placeholder="Kg" />
                </Field.Root>

                <Field.Root>
                    <Field.Label>
                        Quantidade
                        <Field.RequiredIndicator
                            fallback={
                                <Badge size="xs" variant="surface">
                                    Optional
                                </Badge>
                            }
                        />
                    </Field.Label>
                    <Input {...register("qtd")} placeholder="Quantidade" />
                </Field.Root>
                
                <Field.Root>
                    <Field.Label>
                        Valor (Uni. ou 1Kg)
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
                    Adicionar no carrinho
                </Button>
                </Stack>
            </form>
        </Box>
    );
}
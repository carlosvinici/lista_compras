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

type FormData = {
  name: string;
  kg?: string;
  qtd?: number;
  price?: number;
  description?: string;
};
type PropsRegisterProduct = {
    actionSubmitForm:()=>void
}

export default function RegisterProduct({actionSubmitForm}:PropsRegisterProduct) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const newProduct = {
      name: data.name,
      qtd: data?.qtd? Number(data?.qtd) : 0,
      kg: data?.kg? Number(data?.kg) : 0,
      price: data?.price? Number(data?.kg) : 0,
      id: uuidv4(),
      isChecked: false,
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
                <Input {...register("kg")} type="number" placeholder="Kg" />
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
                <Input {...register("qtd")} type="number" placeholder="Quantidade" />
            </Field.Root>

            <Field.Root>
                <Field.Label>
                    Valor (Uni. ou 1Kg)
                    <Field.RequiredIndicator
                        fallback={
                            <Badge size="xs" variant="surface">
                                Optional
                            </Badge>
                        }
                    />
                </Field.Label>
                <Input {...register("price")} type="number" step="0.01" placeholder="0.0" />
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
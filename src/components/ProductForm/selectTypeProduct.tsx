import { Button, Field, Flex, Input } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"


export default function SelectTypeProduct( { typeProduct, setTypeProduct }:{typeProduct: 'uni'|'kg', setTypeProduct: Dispatch<SetStateAction<'uni'|'kg'>>} ){
    
    return (
        <Flex gap={2}>
            <Button size="xs" colorPalette={"blue"} onClick={()=>setTypeProduct('uni')} opacity={typeProduct=="uni" ? 1 : 0.5} >Uni</Button>
            <Button size="xs" colorPalette={"blue"} onClick={()=>setTypeProduct('kg')} opacity={typeProduct=="kg" ? 1 : 0.5} >Kg</Button>
        </Flex>
    )
}
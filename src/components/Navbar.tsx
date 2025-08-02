import { Box, Flex, Heading, Link } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex as="nav" bg="teal.500" p={4} align="center">
      <Heading size="lg" color="white">
        My Next Chakra App
      </Heading>
      <Box ml="auto">
        <Link href="/" color="white" mx={2}>
          Home
        </Link>
        <Link href="/about" color="white" mx={2}>
          About
        </Link>
        <Link href="/contact" color="white" mx={2}>
          Contact
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
import { ProductForm, SideNav } from "@components";

const page = () => {
  return (
    <SideNav>
      <h1>New Products</h1>
      <ProductForm />
    </SideNav>
  );
};

export default page;

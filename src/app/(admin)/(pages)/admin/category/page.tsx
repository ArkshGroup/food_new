import { CategoryDialogForm } from "@/app/(admin)/_components/category/category-dialog-form";
import CategoryTable from "@/app/(admin)/_components/category/table";
import { adminService } from "@/app/(admin)/_services/index.service";

const CategoryPage = async () => {
  const { category } = adminService;
  const { data } = await category.getAllCategories();

  return (
    <div className="">
      <div className=" pt-4">
        <CategoryDialogForm mode="create" />
      </div>
      <CategoryTable data={data} />
    </div>
  );
};

export default CategoryPage;

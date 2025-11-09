import { useEffect, useState } from "react";



import ProductTableItem from "@/components/ProductTableItem";
import AddProductPopUp from "@/components/AddProductPopUp";
import { useQuery } from "@tanstack/react-query";
import api  from "../../api/axiosIntercepter";
export default function Admin() {
  // cons  t [products, setProducts] = useState<any[]>([]);

  const [openModel , setOpenModel] = useState(false); 
  const [search , setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "tables",
    stock: "",
    image_url: "",
  });

  // useEffect(() => {
  //   checkAdminAndFetchProducts();
  // }, []);


    const { data : products, isLoading, refetch , isSuccess } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const res = await api.get("/products", {});
        return res.data;
      },
      // keepPreviousData : true,
      // onSuccess : (data) => {
      //   if(selectedCategory === "all"){
      //     setProducts(data);
      //   } else {
      //     const filtered = data.filter((product: any) => product.category === selectedCategory);
      //     setProducts(filtered);
      //   }
      // }
    });

console.log(products)

  const checkAdminAndFetchProducts = async () => {
    // const { data: { user } } = await supabase.auth.getUser();

    // if (!user) {
    //   navigate("/auth");
    //   return;
    // }

  //   const { data: roleData } = await supabase
  //     .from('user_roles')
  //     .select('role')
  //     .eq('user_id', user.id)
  //     .eq('role', 'admin')
  //     .single();

  //   if (!roleData) {
  //     toast({
  //       variant: "destructive",
  //       title: "Accès refusé",
  //       description: "Vous n'avez pas les droits administrateur",
  //     });
  //     // navigate("/");
  //     return;
  //   }

  //   setIsAdmin(true);
  //   fetchProducts();
  // };

//   const fetchProducts = async () => {
//     const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
//     if (data) setProducts(data);
//     setLoading(false);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const { error } = await supabase.from('products').insert({
//       name: formData.name,
//       description: formData.description,
//       price: parseFloat(formData.price),
//       category: formData.category,
//       stock: parseInt(formData.stock),
//       image_url: formData.image_url,
//     });

//     if (error) {
//       toast({
//         variant: "destructive",
//         title: "Erreur",
//         description: "Impossible d'ajouter le produit",
//       });
//     } else {
//       toast({
//         title: "Produit ajouté !",
//         description: "Le produit a été ajouté avec succès",
//       });
//       setFormData({
//         name: "",
//         description: "",
//         price: "",
//         category: "tables",
//         stock: "",
//         image_url: "",
//       });
//       fetchProducts();
//     }

//     setLoading(false);
//   };

    



  const deleteProduct = async (id: string) => {
    // const { error } = await supabase.from('products').delete().eq('id', id);

    // if (!error) {
    //   toast({
    //     title: "Produit supprimé",
    //     description: "Le produit a été supprimé avec succès",
    //   });
      // fetchProducts();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-xl text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }
 

  return (
    <div className=" bg-background">
      {openModel && <AddProductPopUp setOpenModel={setOpenModel} />}
      <div className="container mx-auto px-4 ">
        <div className="w-full ">
          <input
            className="w-full  rounded-xl   border border-gray-300 px-4 py-2 mb-6 focus:outline-none focus:ring-1 focus:ring-orange-800 focus:border-transparent  "
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setOpenModel(true)}
          className="mb-6 px-4 py-1  bg-[#a67c00] text-white rounded-lg hover:bg-gold-700 transition-colors"
        >
          Ajouter un Produit
        </button>

        <div className="grid lg:grid-cols-2 gap-8"></div>
        {/* table header */}
          <div className="hidden  sm:flex items-center justify-between w-full px-2 py-2 border-b border-gray-400 font-semibold text-sm text-muted-foreground">
            <div className="w-24">Image</div>
            <div className="flex-1 text-center  sm:w-1/5">Name</div>
            <div className="flex-1 text-center sm:w-1/5">Category</div>
            <div className="flex-1 sm:w-1/5">Price</div>
            <div className="flex-1 text-center sm:w-1/5">Stock</div>
            <div className="flex gap-1  w-24 justify-end">Actions</div>
          </div>
        <div className="space-y-4     max-h-[600px] overflow-y-auto">
          {isSuccess && (
          products.products.map((product) => (
            <ProductTableItem key={product.id} product={product} />
          )) 
          )}
        </div>
      </div>
    </div>
  );
}

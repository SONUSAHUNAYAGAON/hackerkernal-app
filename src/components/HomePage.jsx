import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import ProductList from "./ProductList";

const HomePage = () => {
  // state for create add product modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state for store product data(product name and price) from product Data
  const [productList, setProductList] = useState([]);
  // state for search product
  const [searchProduct, setSearchProduct] = useState("all");
  // store the product and price data
  const [productData, setProductData] = useState({
    product: "",
    price: "",
  });
  // handle the prduct and price data
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  // finally add product data to productList array data
  const handleAddProduct = (event) => {
    event.preventDefault();
    // check the duplicate product
    const duplicateProduct = productList?.some(
      (product) =>
        product.product.toLocaleLowerCase() ===
        productData.product.toLocaleLowerCase()
    );
    // if we have duplicate then will be return
    if (duplicateProduct) {
      alert("product already exist");
      return;
    }
    // add product data in product list array from spread operator
    setProductList([
      ...productList,
      {
        product: productData.product,
        price: productData.price,
      },
    ]);
    // reset our product data state
    setProductData({ product: "", price: "" });
    setIsModalOpen(false);
  };
  //handle search product name and price
  const handleSearchProduct = (event) => {
    const value = event.target.value;
    setSearchProduct(value);
  };

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto my-5">
        <div className="sm:flex sm:justify-between sm:items-center mb-5">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
              Product ✨
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Add account button */}
            <SearchBar onChange={handleSearchProduct} />

            <button
              className="btn bg-blue-600 hover:bg-blue-700 text-white flex p-2 text-center align-middle"
              onClick={() => setIsModalOpen(true)}
            >
              <svg
                className="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className=" ml-2">Add Product</span>
            </button>
          </div>
        </div>

        {/*product table */}
        <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
          <header className="px-5 py-4">
            <h2 className="font-semibold text-slate-800">
              All Product
              <span className="text-slate-400 font-medium">
                {productList.length}
              </span>
            </h2>
          </header>
          <div>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                  <tr>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Product Name
                      </div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Product Price
                      </div>
                    </th>

                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold w-1/5">Action</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-slate-200">
                  {productList.filter((data) => {
                    if (searchProduct === "all") {
                      return true;
                    }
                    return (
                      data.product
                        .toLocaleLowerCase()
                        .includes(searchProduct.toLocaleLowerCase()) ||
                      data.price
                        .toLocaleLowerCase()
                        .includes(searchProduct.toLocaleLowerCase())
                    );
                  }).length === 0 ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-4 text-slate-500"
                      >
                        No product found
                      </td>
                    </tr>
                  ) : (
                    productList
                      .filter((data) => {
                        if (searchProduct === "all") {
                          return true;
                        }
                        return (
                          data.product
                            .toLocaleLowerCase()
                            .includes(searchProduct.toLocaleLowerCase()) ||
                          data.price
                            .toLocaleLowerCase()
                            .includes(searchProduct.toLocaleLowerCase())
                        );
                      })
                      .map((product) => {
                        return (
                          <ProductList
                            key={product.product}
                            product={product.product}
                            price={product.price}
                          />
                          // <tr key={product.product}>
                          //   <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          //     <div className="text-left">{product.product}</div>
                          //   </td>
                          //   <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          //     <div className="text-left">${product.price}</div>
                          //   </td>
                          //   <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          //     <div className="text-center bg-red-600 text-white p-1 w-1/5">
                          //       X
                          //     </div>
                          //   </td>
                          // </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-100   bg-opacity-0">
            <div className="bg-white p-6 rounded shadow-md text-black w-1/3">
              <h2 className="text-lg font-bold text-black">Add Product Form</h2>

              <form
                className="flex flex-col gap-4 pb-4"
                onSubmit={handleAddProduct}
              >
                <h1 className="mb-4 text-2xl font-bold text-black text-center">
                  Login
                </h1>

                {/* Email Field */}
                <div>
                  <label className="text-sm font-medium" htmlFor="productName">
                    Product Name:
                  </label>
                  <input
                    className="block w-full border  border-gray-300 p-2.5 text-sm rounded-lg"
                    id="productName"
                    type="text"
                    name="product"
                    placeholder="product 1"
                    value={productData.product}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="text-sm font-medium" htmlFor="price">
                    Price
                  </label>
                  <input
                    className="block w-full border  border-gray-300 p-2.5 text-sm rounded-lg"
                    id="price"
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="10"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="border transition-colors focus:ring-2 p-2 disabled:cursor-not-allowed bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white rounded-lg"
                >
                  Add Product
                </button>
              </form>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default HomePage;

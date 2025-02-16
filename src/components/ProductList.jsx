const ProductList = (props) => {
  return (
    <>
      <tr key={props.product} className="mb-5">
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left">{props.product}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left">${props.price}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center bg-red-600 text-white p-1 w-1/5">X</div>
        </td>
      </tr>
    </>
  );
};

export default ProductList;

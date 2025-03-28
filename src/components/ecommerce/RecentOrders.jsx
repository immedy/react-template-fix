import PropTypes from "prop-types"; // Import PropTypes
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Status color mapping
const statusColors = {
  Delivered: "success",
  Pending: "warning",
  Canceled: "error",
};

// Data produk
const tableData = [
  {
    id: 1,
    name: "MacBook Pro 13”",
    variants: "2 Variants",
    category: "Laptop",
    price: "$2399.00",
    status: "Delivered",
    image: "/images/product/product-01.jpg",
  },
  {
    id: 2,
    name: "Apple Watch Ultra",
    variants: "1 Variant",
    category: "Watch",
    price: "$879.00",
    status: "Pending",
    image: "/images/product/product-02.jpg",
  },
];

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Recent Orders
      </h3>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader>Products</TableCell>
              <TableCell isHeader>Category</TableCell>
              <TableCell isHeader>Price</TableCell>
              <TableCell isHeader>Status</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableData.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      className="h-[50px] w-[50px] rounded-md"
                      alt={product.name}
                    />
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <span className="text-gray-500">{product.variants}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Badge size="sm" color={statusColors[product.status]}>
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Validasi properti menggunakan PropTypes
RecentOrders.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  variants: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.string,
  status: PropTypes.oneOf(["Delivered", "Pending", "Canceled"]),
  image: PropTypes.string,
};

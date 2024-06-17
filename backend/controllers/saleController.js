const {
  Genre,
  Book,
  BookGenre,
  Sale,
  SaleDetail,
  User,
  sequelize,
  QueryTypes,
  Op,
} = require("../models/index");

exports.getAllSales = async (req, res) => {
  try {
      const sales = await Sale.findAll();
      return res.status(200).json({
          status: "success",
          results: sales.length,
          data: {
              sales,
          },
      });
  } catch (error) {
      console.error("Error fetching sales:", error);
      return res.status(400).json({
          status: "fail",
          message: "Failed to fetch sales.",
      });
  }
};

exports.createSale = async (req, res) => {
  try {
      const { name, address, phoneNumber, cartItems, userId } = req.body;

      // Validate required fields
      if (!name || !address || !phoneNumber) {
          return res.status(400).json({
              status: "fail",
              message: "The request does not contain full information",
          });
      }

      // Create new sale
      const newSale = await Sale.create({
          user_id: userId,
          name,
          phoneNumber,
          address,
          date: new Date(), // Assuming you want to use the current date
      });

      // Create sale details (items in the cart)
      await Promise.all(
          cartItems.map(async (cartItem) => {
              await SaleDetail.create({
                  sale_id: newSale.id,
                  book_id: cartItem.id,
                  quantity: cartItem.amount,
              });
          })
      );

      return res.status(200).json({
          status: "success",
          data: {
              new_sale: newSale,
          },
      });
  } catch (error) {
      console.error("Error creating sale:", error);
      return res.status(400).json({
          status: "fail",
          message: "Create sale failed.",
      });
  }
};

// exports.createSaleDetail = async (req, res) => {
//   try {
//     const { cartItems, total } = req.body;
//     let saleDetails = [];

//     for (const cartItem of cartItems) {
//       const newSaleDetail = await SaleDetail.create({
//         sale_id: sale_id,
//         book_id: cartItem.id,
//         quantity: cartItem.quantity,
//         total,
//        });
//       saleDetails.push(newSaleDetail);
//     }

//     return res.status(200).json({
//       status: "success",
//       data: {
//         saleDetailList: saleDetails,
//       },
//     });
// } catch (error) {
//   return res.status(400).json({
//     status: "fail",
//     message: "Create sale detail fail...",
//   });
// }
// };

// exports.createSale = async (req, res) => {
//   try {
//     const newSale = await Sale.create({
//       const {user_id, total, address, phoneNumber} = req.body;
//     });

//     return res.status(200).json({
//       status: "success",
//       data: {
//         new_sale: newSale,
//       },
//     });
// } catch (error) {
//   return res.status(400).json({
//     status: "fail",
//     message: "Create sale fail...",
//   });
// }
// };

// exports.updateSale = async (req, res) => {
//   try {
//     const sale = await Sale.findOne({ where: { id: req.params.id } });
//     if (!sale) {
//       return res.status(404).json({
//         status: "fail",
//         message: "No sale found with that ID",
//       });
//     }

//     await sale.update({ ...req.body });

//     return res.status(200).json({
//       status: "success",
//       data: {
//         sale,
//       },
//     });
// } catch (error) {
//   return res.status(400).json({
//     status: "fail",
//     message: "Update sale fail...",
//   });
// }
// };

// exports.deleteSale = async (req, res) => {
//   try {
//     const sale = await Sale.findOne({ where: { id: req.params.id } });
//     if (!sale) {
//       return res.status(404).json({
//         status: "fail",
//         message: "No sale found with that ID",
//       });
//     }

//     await sale.destroy();
//       return res.status(204).json({
//         status: "success",
//         data: null,
//       });
// } catch (error) {
//   return res.status(400).json({
//     status: "fail",
//     error: error.errors[0].message,
//   });
// }
// };

// exports.updateSaleDetail = async (req, res) => {
//   try {
//     const saleDetail = await SaleDetail.findOne({ where: { id: req.params.id } });
//     if (!saleDetail) {
//       return res.status(404).json({
//         status: "fail",
//         message: "No sale detail found with that ID",
//       });
//     }

//     await saleDetail.update({ ...req.body });

//     return res.status(200).json({
//       status: "success",
//       data: {
//         saleDetail,
//       },
//     });
// } catch (error) {
//   return res.status(400).json({
//     status: "fail",
//     message: "Update sale detail fail...",
//   });
// }
// };

// exports.deleteSaleDetail = async (req, res) => {
//   try {
//     const saleDetail = await SaleDetail.findOne({ where: { id: req.params.id } });
//     if (!saleDetail) {
//       return res.status(404).json({
//         status: "fail",
//         message: "No sale detail found with that ID",
//       });
//     }

//     await saleDetail.destroy();
//       return res.status(204).json({
//         status: "success",
//         data: null,
//       });
// } catch (error) {
//   return res.status(400).json({
//     status: "fail",
//     error: error.errors[0].message,
//   });
// }
// };

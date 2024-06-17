import React from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
  Box,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { usePayment } from "./usePayment";
import TitleText from "../../ui/sharedComponents/TitleText";

const useStyles = styled((theme) => ({
  root: {
    width: "100%",
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(1),
  },
  listItem: {
    alignItems: "flex-start",
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:last-child": {
      borderBottom: "none",
    },
  },
  listItemText: {
    marginLeft: theme.spacing(2),
  },
  inline: {
    display: "inline",
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

const PaymentHistory = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const { payment, isLoading, isError } = usePayment(currentUser.id);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="body1" color="error">
        Error: {isError.message}
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <TitleText>Payment History</TitleText>
      <List>
        {payment.map((sale, index) => (
          <div key={sale.id}>
            <Typography variant="body">
              Sale ID: {sale.id} | Date: {new Date(sale.date).toLocaleString()}
            </Typography>
            <Typography variant="subtitle2">Customer: {sale.name}</Typography>
            <Typography variant="subtitle2">
              Phone Number: {sale.phoneNumber}
            </Typography>
            <Typography variant="subtitle2">
              Total: {sale.total} VND
            </Typography>
            <List>
              {sale.SaleDetails.map((detail) => (
                <ListItem key={detail.id} className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar alt={detail.Book.title} src={detail.Book.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={detail.Book.title}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Quantity: {detail.quantity}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Price: {detail.Book.price}{" VND"}
                          {/* Assuming price is in cents */}
                        </Typography>
                      </>
                    }
                    className={classes.listItemText}
                  />
                </ListItem>
              ))}
            </List>
            {index !== payment.length - 1 && (
              <Divider className={classes.divider} />
            )}
          </div>
        ))}
      </List>
    </div>
  );
};

export default PaymentHistory;

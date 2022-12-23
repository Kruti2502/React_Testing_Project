import Button from "react-bootstrap/Button";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  // disable order button if no scoops 
  const orderDisabled = totals.scoops === 0;

  return (
    <div>
      <h2 style={{textAlign: "center" }}>Design Your Sundae!</h2>
      &nbsp;
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button className="mt-2" disabled={orderDisabled} onClick={() => setOrderPhase("review")}>
        Order Sundae!
      </Button>
    </div>
  );
}

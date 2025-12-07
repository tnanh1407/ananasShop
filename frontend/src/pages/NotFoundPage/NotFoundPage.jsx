import "./NotFoundPage.scss";
import PageNotFound from "../../assets/page_not_found.png";
import { Container } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <>
      <div className="page_not_found">
        <Container fluid className="p-0">
          <img src={PageNotFound}></img>
        </Container>
      </div>
    </>
  );
};

export default NotFoundPage;

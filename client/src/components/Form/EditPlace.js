import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";

function EditPlace(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(props.name);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/updatePlace/${props.id}`,
        { name }
      );

      if (data?.success) {
        toast.success("Place name updated successfully");
        handleClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary ms-2">
        Edit
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Place Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="editmodal">
            <div className="container d-flex justify-content-center align-items-center">
              <div className="mb-3 d-flex ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter new Place"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button
            form="editmodal"
            onClick={handleUpdate}
            className="btn btn-primary"
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPlace;

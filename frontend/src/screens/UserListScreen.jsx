import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { getAllUsers } from "../actions/userActions";
import FormContainer from "../Components/FormContainer";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    alert(id);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history]);
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email} </a>
                  </td>

                  <td>
                    {user.isAdmin ? (
                      <i
                        className={"fas fa-check"}
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i
                        className={"fas fa-times"}
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {" "}
                    <LinkContainer to={`/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        deleteHandler(user._id);
                      }}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
import React from "react";
import { Users } from "../services/http";
import { UserItem } from "../models/users";
import { Table } from "react-bootstrap";

interface UserListProps {}

interface UserListState {
  isLoading: boolean;
  tableData: UserItem[];
}

export class UserListPage extends React.Component<
  UserListProps,
  UserListState
> {
  constructor(props: UserListProps) {
    super(props);

    this.state = {
      isLoading: false,
      tableData: [],
    };
  }

  componentDidMount(): void {
    Users.getList().then((res) => {
      this.setState({ ...this.state, tableData: res.data });
    });
  }

  render() {
    const list = this.state.tableData.map((item, index) => (
      <tr>
        <td>{index + 1}</td>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.birthDate}</td>
        <td>{item.username}</td>
        <td>{item.email}</td>
      </tr>
    ));

    return (
      <div>
        <h2>User List Page</h2>
        <div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Birth Date</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

import React from "react";
import { Users } from "../services/http";
import { UserItem } from "../models/users";
import { Table } from "react-bootstrap";
import { shortDate } from "../utils/date-time";

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
    this.loadUsers();
  }

  loadUsers() {
    this.setState({ ...this.state, isLoading: true });
    Users.getList()
      .then((res) => {
        this.setState({ ...this.state, tableData: res.data, isLoading: false });
      })
      .catch(() => {
        this.setState({ ...this.state, isLoading: false });
      });
  }

  render() {
    const list = this.state.tableData.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{shortDate(item.birthDate)}</td>
        <td>{item.username}</td>
        <td>{item.email}</td>
      </tr>
    ));

    const loading = (
      <tr>
        <td colSpan={6} align="center">
          Loading...
        </td>
      </tr>
    );

    return (
      <div>
        <h2>User List</h2>
        <div>
          <Table>
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
            <tbody>{this.state.isLoading ? loading : list}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

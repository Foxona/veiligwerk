import { useEffect, useState } from "react";
import { TableModal } from "../components/Modal";
import { UserType } from "@/types/usertype";
import Pagination from "@/components/Pagination";

const usersPerPage = 20;
const totalUsers = 100;

const UsersTable = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<UserType | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://randomuser.me/api/?page=${currentPage}&results=${usersPerPage}`
        );
        const data = await response.json();
        setUsers(data.results);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  if (!users) return null;

  return (
    <div className="flex flex-col">
      <div
        id="table"
        className="relative shadow-md sm:rounded-lg w-[700px] mt-8"
      >
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td
                  className="py-4 px-6 hover:text-blue-500 hover:underline hover:cursor-pointer"
                  onClick={() => {
                    setActiveUser(user);
                    setModalIsOpen(true);
                  }}
                >
                  {user.name.first} {user.name.last}
                </td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.phone}</td>
              </tr>
            ))}
            {activeUser && (
              <TableModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                user={activeUser}
              />
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsPerPage={usersPerPage}
        totalItems={totalUsers}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex justify-center items-center">
      <UsersTable />
    </main>
  );
}

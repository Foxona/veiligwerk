import Image from "next/image";
import { useEffect, useState } from "react";
import { TableModal } from "../components/Modal";
import { UserType } from "@/types/usertype";

const howManyUsersToGet = 20;

const UsersTable = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<UserType | null>(null);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=${howManyUsersToGet}`)
      .then((res) => res.json())
      .then((data) => setUsers(data.results));
  }, []);

  if (!users) return null;

  return (
    <>
      <div id="table" className="relative shadow-md sm:rounded-lg">
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
    </>
  );
};

export default function Home() {
  return (
    <main className={``}>
      <UsersTable />
    </main>
  );
}

import {Table, Group, Text, ScrollArea, Select, ActionIcon, Menu} from '@mantine/core';
import React, {useEffect, useState} from "react";
import {request, setAuthHeader} from "../../axiosFile/axios_helper";
import {IconMessage2, IconPencil, IconSettings2, IconTrash} from "@tabler/icons-react";
import {DeleteButton} from "@refinedev/mantine";
import {notifications} from "@mantine/notifications";
export default function UserList() {
    const [userList,setUserList] = useState([])

    useEffect(() => {
        request('GET', `/users`, {})
            .then((response) => {
                setUserList(response.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    console.error('Error fetching users list:', error);
                }
            });
    },[]);

    const handleRoleChange = (userLogin, newRole) => {

        request('POST',`/users/${userLogin}/change-role?newRole=${newRole}`, {})
            .then((response) => {
                console.log(`ROLE HAS CHANGED FOR `, userLogin, newRole)
                notifications.show({ message: "You've changed a role of " + userLogin + " to " + newRole})
            })
            .catch((error) => {
            console.error(`ERROR`)
        })

    }

    const rows = userList.map((users) => (
        <tr key={users.firstName}>
            <td>
                <Group spacing={"sm"}>
                    <Text fz="sm" fw={500}>
                        {users.login}
                    </Text>
                </Group>
            </td>
            <td>
                {/*onChange={(newRole) => handleRoleChange(users.id, )}*/}
                <Select data={['USER','ADMIN','SELLER']} onChange={(roleTo) =>
                    handleRoleChange(users.login,roleTo)}
                        defaultValue={users.role} variant="unstyled" />

            </td>
            <td>
            <Group spacing={0} position="right">
                <Menu transitionProps={{ transition: 'pop-top-right'}} withArrow position="bottom-end">
                    <Menu.Target>
                        <ActionIcon>
                            <IconSettings2 size="1rem" stroke={1.5} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item icon={<IconMessage2 size="1rem" stroke={1.5} />}>Send Message</Menu.Item>
                        <Menu.Item icon={<IconTrash size="1rem" stroke={1.5} />} color="red">
                            Terminate contract
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
            </td>
        </tr>
    ))
    return (
        <ScrollArea>
        <Table miw={800} verticalSpacing="sm">
            <thead>
            <tr>
                <th>User</th>
                <th>Role</th>
                <th>Change Status</th>
                <th>Others</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
        </ScrollArea>
    )
}
import * as React from "react";

import { Menu, Button } from '@mantine/core';
import {
    IconCreativeCommons, IconBrandProducthunt, IconLogout
} from '@tabler/icons-react';

export default function Buttons(props) {
    return (
        <>
                {!props.isAuthenticated && (
                    <button className="btn btn-primary" style={{ margin: '10px' }} onClick={props.login}>
                        Login or Register
                    </button>
                )}
                {props.isAuthenticated && (

                    <Menu position={"left"} shadow={"md"} width={200}>
                        <Menu.Target>
                            <Button>Menu</Button>
                        </Menu.Target>
                        <Menu.Dropdown
                            label="Menu"
                            control={<Button className="btn btn-dark" style={{ margin: '10px' }}>Menu</Button>}
                        >
                            <Menu.Label>Menu</Menu.Label>
                            <Menu.Item icon={<IconCreativeCommons size={14} />} onClick={props.create}>Create Product</Menu.Item>
                            <Menu.Item icon={<IconBrandProducthunt size={14} /> } onClick={props.myProducts}>My products</Menu.Item>
                            <Menu.Divider/>
                            <Menu.Label>Others</Menu.Label>
                            <Menu.Item icon={<IconLogout size={14} />} onClick={props.logout}>Logout</Menu.Item>

                        </Menu.Dropdown>
                    </Menu>

                )}
        </>
    );
};
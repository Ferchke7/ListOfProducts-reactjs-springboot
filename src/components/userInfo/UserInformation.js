import {createStyles, Text, Group, HoverCard} from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },

    name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));


export function UserInfoIcons({ name, email }) {
    const { classes } = useStyles();
    return (
                <HoverCard width={280} shadow="md" position="top-center">
                    <HoverCard.Target>
                    <Text fz="lg" fw={500} className={classes.name}>
                        {name}
                    </Text>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                    <Group noWrap spacing={10} mt={3}>
                        <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                        <Text fz="xs" c="dimmed">
                            {email}
                        </Text>
                    </Group>
                    </HoverCard.Dropdown>
                </HoverCard>
    );
}
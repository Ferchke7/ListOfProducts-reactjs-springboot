import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
} from '@mantine/core';

export default function LoginForm({ onLogin, onRegister }) {
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            firstName: '',
            email: '',
            login: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 2 ? 'Password should include at least 6 characters' : null),
        },
    });

    const onSubmit = (event) => {
        event.preventDefault()
        if (type === 'login') {
            const { login, password } = form.values;
            onLogin(login, password);
        } else if (type === 'register') {
            const { firstName, email, login, password } = form.values;
            onRegister(firstName, email, login, password);
        }
    };

    return (
        <Paper radius="md" p="xl">
            <Text size="lg" weight={500}>
                Welcome, {type} with
            </Text>

            <Group grow mb="md" mt="md">
                <Button radius="xl">Google</Button>
                <Button radius="xl">Twitter</Button>
            </Group>

            <Divider label={`Or continue with ${type}`} labelPosition="center" my="lg" />

            <form onSubmit={onSubmit}>
                <Stack>
                    {type === 'register' && (
                        <>
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                value={form.values.firstName}
                                onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                                radius="md"
                            />

                            <TextInput
                                required
                                label="Email"
                                placeholder="hello@mantine.dev"
                                value={form.values.email}
                                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                error={form.errors.email && 'Invalid email'}
                                radius="md"
                            />
                        </>
                    )}

                    <TextInput
                        required
                        label="Login"
                        placeholder="Your login"
                        value={form.values.login}
                        onChange={(event) => form.setFieldValue('login', event.currentTarget.value)}
                        error={form.errors.login && 'Invalid login'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />

                    {type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        color="dimmed"
                        onClick={() => toggle()}
                        size="xs"
                    >
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}

<template>
    <div class="container">
        <div class="logo-container">
            <Logo />
        </div>

        <a-form :form="form" class="login-form" @submit="onSubmit">
            <a-form-item>
                <a-input
                    v-decorator="[
                        'username',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your username!'
                                }
                            ]
                        }
                    ]"
                    placeholder="Username"
                >
                    <a-icon
                        slot="prefix"
                        type="user"
                        style="color: rgba(0,0,0,.25)"
                    />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    v-decorator="[
                        'password',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                }
                            ]
                        }
                    ]"
                    placeholder="Password"
                    type="password"
                >
                    <a-icon
                        slot="prefix"
                        type="lock"
                        style="color: rgba(0,0,0,.25)"
                    />
                </a-input>
            </a-form-item>
            <a-form-item class="login-form__footer">
                <a-checkbox
                    v-decorator="[
                        'isRemember',
                        {
                            valuePropName: 'checked',
                            initialValue: false
                        }
                    ]"
                >
                    Remember me
                </a-checkbox>
                <a class="login-form__forgot" href="#">
                    Forgot password
                </a>
                <a-button
                    type="primary"
                    html-type="submit"
                    class="login-form__button"
                >
                    Log in
                </a-button>
                Or
                <a href="#">
                    Register now!
                </a>
            </a-form-item>
        </a-form>
        <footer class="footer">
            <div class="copyright">
                Copyright by
                <a href="http://evsx.com">
                    EVS inc.©
                </a>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Vue from 'vue';
import { Form } from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

Vue.use(Form);

export default {
    data() {
        return {
            isRemember: false,
            form: this.$form.createForm(this, { name: 'normal_login' })
        };
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),

        async onSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.login({
                        login: values.username,
                        password: values.password
                    });
                }
            });
        }
    }
};
</script>

<style>
.container {
    margin: 50px auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 48px;
    color: #35495e;
    letter-spacing: 1px;
}

.logo-container {
    margin: 20px auto;
    width: 300px;
    height: 80px;
}

.login-form {
    margin: 50px auto;
    width: 35%;
}

.login-form__forgot {
    float: right;
}

.login-form__button {
    width: 100%;
}

.footer {
    background-color: #eee;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 20px 50px;
}
</style>

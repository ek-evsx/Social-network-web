<template>
    <div class="container">
        <div class="logo-container">
            <Logo />
        </div>

        <a-form :form="form">
            <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="Login"
            >
                <a-input
                    v-decorator="[
                        'username',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your login'
                                }
                            ]
                        }
                    ]"
                    placeholder="Please input your login"
                />
            </a-form-item>
            <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="Password"
            >
                <a-input
                    type="password"
                    v-decorator="[
                        'password',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password'
                                }
                            ]
                        }
                    ]"
                    placeholder="Please input your password"
                />
            </a-form-item>
            <a-form-item
                :label-col="formTailLayout.labelCol"
                :wrapper-col="formTailLayout.wrapperCol"
            >
                <a-checkbox :checked="isRemember" @change="handleChange">
                    Remember?
                </a-checkbox>
            </a-form-item>
            <a-form-item
                :label-col="formTailLayout.labelCol"
                :wrapper-col="formTailLayout.wrapperCol"
            >
                <a-button type="submit" @click="onSubmit">
                    Log in!
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import Vue from 'vue';
import { Form } from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

Vue.use(Form);

const formItemLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 }
};
const formTailLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12, offset: 4 }
};

export default {
    //@ts-ignore
    data() {
        return {
            isRemember: false,
            username: '',
            password: '',
            formItemLayout,
            formTailLayout,
            //@ts-ignore
            form: this.$form.createForm(this, { name: 'dynamic_rule' })
        };
    },
    methods: {
        ...mapActions(['login']),
        async onSubmit() {
            console.log(this);
            //@ts-ignore
            this.login();
        }
    }
};
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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
    width: 200px;
    height: 100px;
}
</style>

<script lang="ts">
import { enhance } from '$app/forms';

export let form;
</script>

<h1>Log In</h1>
<form action="?/login" method="post" use:enhance autocomplete="off">
    <input type="email" placeholder="Email" name="email" required>
    <input type="password" placeholder="Password" name="password" required>
    <button>Log In</button>
</form>
{#if form?.email_login}
    <p>{form.email_login}</p>
{/if}
{#if form?.password_login}
    <p>{form.password_login}</p>
{/if}

<h1>Register</h1>
<form action="?/register" method="post" use:enhance autocomplete="off">
    <input type="email" placeholder="Email" name="email" required>
    <input type="password" placeholder="Password" name="password" required>
    <button>Register</button>
</form>
{#if form?.email_reg}
    <p>{form.email_reg}</p>
{/if}

<script lang="ts">
import { enhance } from '$app/forms';

export let data;
</script>

<h1>Log In</h1>
<form action="?/login" method="post" use:enhance autocomplete="off">
    <input type="email" placeholder="Email" name="email" required>
    <input type="password" placeholder="Password" name="password" required>
    <button>Log In</button>
</form>


<h1>Register</h1>
<form action="?/register" method="post" use:enhance autocomplete="off">
    <input type="email" placeholder="Email" name="email" required>
    <input type="password" placeholder="Password" name="password" required>
    <button>Register</button>
</form>

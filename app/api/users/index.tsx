export async function getUsers() {
	return await fetch("http://localhost:3000/api/nest/users").then((res) =>
		res.json(),
	);
}

export async function signIn(user_id: string, password: string) {
	const signInData = await fetch(`http://localhost:3000/api/nest/signIn`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			user_id,
			password,
		}),
	}).then((res) => res.json());
	return signInData;
}

export async function signOut() {
	return await fetch("http://localhost:3000/api/nest/signout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
}

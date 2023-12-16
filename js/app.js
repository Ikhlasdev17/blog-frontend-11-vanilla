const addPostTogglerEl = document.querySelector('#add-post-toggler')
const postFormEl = document.querySelector('#post-form')
const postsContainerEl = document.querySelector('#posts-container')

const addPostFormEl = document.querySelector('#add-post-form')
const titleInputEl = document.querySelector('#title')
const descriptionInputEl = document.querySelector('#description')
const coverInputEl = document.querySelector('#cover')

let selectedPost = null

let posts = [
	{
		id: 1,
		title: 'Lorem ipsum dolar sit amit!',
		cover: 'https://picsum.photos/450',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem repellendus eum, tenetur provident soluta harum molestiae facilis ab cum eligendi, voluptatibus quos nam ut non rem quis fugiat. Exercitationem, at?',
	},
]

function renderPosts(postsArr = []) {
	postsContainerEl.innerHTML = ''

	if (postsArr.length === 0) {
		postsContainerEl.innerHTML = '<h1 class="not-found">Posts not found!</h1>'
	}

	postsArr.map(item => {
		postsContainerEl.innerHTML += `
			<div class="post__card">
				<img src="${item.cover}" alt="${item.title}" />
				<button onclick="deletePost(${item.id})" class="action-btn">
					<ion-icon name="trash-outline"></ion-icon>
				</button>
				<button onclick="selectPostFunction(${item.id})" class="action-btn">
					<ion-icon name="create-outline"></ion-icon>
				</button>
				<div class="post__card-info">
					<h1>
					${item.title}
					</h1>
					<p>
					${item.description}
					</p>
					<button>Read more...</button>
				</div>
			</div>
		`
	})
}

function postFormTogglerFunc() {
	postFormEl.classList.toggle('active')
	addPostTogglerEl.classList.toggle('active')
	document.body.classList.toggle('overlay')
}

function closeForm() {
	postFormEl.classList.remove('active')
	addPostTogglerEl.classList.remove('active')
	document.body.classList.remove('overlay')
}

function addPost() {
	if (!titleInputEl.value || !descriptionInputEl.value || !coverInputEl.value) {
		Toastify({
			text: 'Please complete all fields!',
		}).showToast()
		return
	}

	const newPost = {
		id: Date.now(),
		title: titleInputEl.value,
		description: descriptionInputEl.value,
		cover: coverInputEl.value,
	}

	posts.unshift(newPost)
	renderPosts(posts)

	Toastify({
		text: 'Published new post!',
		icon: 'success',
	}).showToast()

	closeForm()

	titleInputEl.value = ''
	descriptionInputEl.value = ''
	coverInputEl.value = ''
}

function deletePost(id) {
	const isConfirm = confirm('Do you want delete this post!')
	if (!isConfirm) return
	posts = posts.filter(item => item.id !== id)
	renderPosts(posts)
}

function selectPostFunction(id) {
	const post = posts.find(item => item.id === id)
	selectedPost = post
	titleInputEl.value = selectedPost.title
	descriptionInputEl.value = selectedPost.description
	coverInputEl.value = selectedPost.cover
}

function updatePost() {
	if (!titleInputEl.value || !descriptionInputEl.value || !coverInputEl.value) {
		Toastify({
			text: 'Please complete all fields!',
		}).showToast()
		return
	}
	posts = posts.map(item => {
		if (item.id === selectedPost.id) {
			return {
				...item,
				title: titleInputEl.value,
				description: descriptionInputEl.value,
				cover: coverInputEl.value,
			}
		} else {
			return item
		}
	})

	Toastify({
		text: 'Published new post!',
		icon: 'success',
	}).showToast()

	closeForm()

	titleInputEl.value = ''
	descriptionInputEl.value = ''
	coverInputEl.value = ''

	selectedPost = null
	renderPosts(posts)
}

renderPosts(posts)

window.addEventListener('click', e => {
	if (e.target.className.includes('overlay')) {
		closeForm()
	}
})

addPostFormEl.addEventListener('submit', e => {
	e.preventDefault()
	if (selectedPost) {
		updatePost()
	} else {
		addPost()
	}
})
addPostTogglerEl.addEventListener('click', postFormTogglerFunc)

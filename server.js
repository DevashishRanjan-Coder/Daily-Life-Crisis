import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

//Middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/view-posts`);
        console.log(response);
        res.render("index.ejs", { posts: response.data });
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
});

//Route to render the edit page
app.get("/addPost", (req, res) => {
    res.render("updatePost.ejs", { heading: "New Post", submit: "Create Post" });
})

//Route to handle get specific post requests
app.get("/edit/:id", async (req, res) => {
    try {
        const result = await axios.get(`${API_URL}/view-posts/${req.params.id}`)
        console.log(result.data);
        res.render("updatePost.ejs", {
            heading: "Edit Post",
            submit: "Update Post",
            post: result.data,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching post" });
    }
})

//Route to handle create post requests
app.post("/api/posts", async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/create-posts`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
});

//Route to handle to edit post requests
app.post("/api/posts/:id", async (req, res) => {
    console.log("called");
    try {
        const response = await axios.patch(
            `${API_URL}/update-posts/${req.params.id}`,
            req.body
        );
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
});

//Route to handle delete post requests
app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(`${API_URL}/delete-posts/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
})

//Running the backend server
app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
})
import express, { response } from "express"
import body from "body-parser"

const app = express();
const port = 4000;
const displayDate = new Date();

//In memory Data-Store
let posts = [
    {
        id: 1,
        title: "The adverse world of advertising",
        content: `There is something that no matter what you do you can never escape from. You see it everywhere you go. You might not be aware of it but it is psychologically conditioning you to think about it. So what is it? Well 'Advertising' ofcourse. You can't even take 10 steps without encountering an advert in one form or other. It's not that advertising is inherently evil. Infact it is an artform for talented people with creative minds that can sell almost anything to anyone. It's the multi million conglomerates or more specifically the people behind those conglomerates that make advertising evil.
                  From fast food brands using bright colours, to beauty brands conditioning you into thinking that you aren't fair enough.
                  The way a simple image with some text can absolutely hone in on you and plant a perspective in your mind that was never there before is both amazing and terrifying.
                  Advertising can convince you that you are fat and you need to use this x product to look good and at the same time it can convince you that you might die the moment you step foot outside your house so you should buy a health insurance right now.
                  So the next time you come across an ad think about whether you want to be influenced not.`,
        author: "David Drax",
        date: `${displayDate.toLocaleString("en-US")}`,

    },
    {
        id: 2,
        title: "Mental Health",
        content: `Everyone feels worried or anxious or down from time to time. But relatively few people develop a mental illness. What's the difference? A mental illness is a mental health condition that gets in the way of thinking, relating to others, and day-to-day function.

Dozens of mental illnesses have been identified and defined. They include depression, generalized anxiety disorder, bipolar disorder, obsessive-compulsive disorder, post-traumatic stress disorder, schizophrenia, and many more.

Mental illness is an equal opportunity issue. It affects young and old, male and female, and individuals of every race, ethnic background, education level, and income level. The good news is that it can often be treated.

Signs and symptoms of mental illness depend in part on the illness. Common symptoms include

 feeling down for a while

extreme swings in mood

withdrawing from family, friends, or activities

low energy or problems sleeping

often feeling angry, hostile, or violent

feeling paranoid, hearing voices, or having hallucinations

often thinking about death or suicide.`,
        author: "Harvard Medical School",
        date: `${displayDate.toLocaleString("en-US")}`,

    },
];

//Middlewares
app.use(body.json());
app.use(body.urlencoded({ extended: true }));

//Getting all posts
app.get("/view-posts", (req, res) => {
    res.json(posts);
})

//Getting a specific post
app.get("/view-posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const requestedPost = posts.find((post) => post.id === id);
    res.json(requestedPost);
})

//Creating a new post
app.post("/create-posts", (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: displayDate.toLocaleString("en-US")
    }
    posts.push(newPost);
    res.json(newPost);
})

//Updating a specific post
app.patch("/update-posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const replacementPost = {
        id: id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    }
    const searchIndex = posts.findIndex((post) => post.id === id);
    posts[searchIndex] = replacementPost;
    res.json(replacementPost);
})

//Deleting a post
app.delete("/delete-posts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    posts.forEach(element => {
        if (element.id === id) {
            posts.splice(id - 1, 1);
            console.log(posts.length);
            res.sendStatus(200);
        } else {
            res.status(404);
        }
    });
});

//Running the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})
const submitPodcast = async (event) => {
  event.preventDefault();
  const body = {
    name: document.querySelector("#podcast-name").value,
  };

  //add in conditional logic to do a PUT method if the user has already reviewed this pod.

  const response = await fetch("/api/podcast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const myPodcast = await response.json();
    console.log("review submitted");
    const podcast = myPodcast.id;
    submitReview(podcast);
  } else {
    localStorage.setItem("toast", "This podcast may already exist.");
    toastIt(true);
  }
};

async function submitReview(podcast) {
  const body = {
    podcast_id: podcast,
    rating: parseInt(
      document.querySelector(".star-icon [type=radio]:checked").value
    ),
    review: document.querySelector("#review").value,
    user_id: parseInt(
      document.querySelector("#submit-review").getAttribute("data-id")
    ),
  };
  console.log(body);

  const response = await fetch("/api/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    localStorage.setItem("toast", "You have submitted a review.");
    console.log("all submitted");
    document.location.replace("/");
  } else {
    localStorage.setItem("toast", "Failed to complete review.");
    toastIt(true);
  }
};

document
  .querySelector("#submit-review")
  .addEventListener("click", submitPodcast);

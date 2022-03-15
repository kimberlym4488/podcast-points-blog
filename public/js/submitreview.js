const submitReview = async (event) => {
  event.preventDefault();
  const body = {
    podcast_id: parseInt(document.querySelector("#podcast-select").value),
    rating: parseInt(
      document.querySelector(".star-icon [type=radio]:checked").value
    ),
    review: document.querySelector("#review").value,
  };
  //add in conditional logic to do a PUT method if the user has already reviewed this pod.

  const response = await fetch("/api/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    localStorage.setItem("toast", "You have submitted a review.");
    document.location.replace("/");
  } else {
    const update = await fetch(
      `/api/review/update/${parseInt(
        document.querySelector("#podcast-select").value
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (update.ok) {
      localStorage.setItem("toast", "You have submitted a review.");
      document.location.replace("/");
    } else {
      localStorage.setItem("toast", "Failed to complete review.");
      toastIt(true);
    }
  }
};

document
  .querySelector("#submit-review")
  .addEventListener("click", submitReview);

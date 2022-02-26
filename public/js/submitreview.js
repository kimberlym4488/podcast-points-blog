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
    document.location.replace(
      "/?toast=" + encodeURI(`Review submitted successfully!`)
    );
  } else {
    alert("Review already exists, we'll attempt to update your data.");

    const update = await fetch(`/api/review/update/${parseInt(document.querySelector("#podcast-select").value)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
console.log(update);
alert("Check console.log");
    if (update.ok) {
      document.location.replace(
        "/?toast=" + encodeURI(`Review updated successfully!`)
      );
    } else {
      document.location.replace(
        "/?toast=" +
          encodeURI("Sorry, this failed to update. Please try again.")
      );
    }
  }
};
document
  .querySelector("#submit-review")
  .addEventListener("click", submitReview);

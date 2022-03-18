const editReview = async (event) => {
  event.preventDefault();
  const review_id = document
    .querySelector(".editReview")
    .getAttribute("data-id");

  const body = {
    rating: parseInt(
      document.querySelector(".star-icon [type=radio]:checked").value
    ),
    review: document.querySelector("#review").value,
  };

  const response = await fetch(`/api/review/:${review_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    localStorage.setItem("toast", "Review has been updated sucessfully!");
    document.location.replace("/");
  } else {
    localStorage.setItem("toast", "Failed to update review.");
    toastIt(true);
  }
};

document.querySelector(".editReview").addEventListener("click", editReview);

// Delete review functionality

const deleteReview = async (event) => {
  event.preventDefault();
  const review_id = document
    .querySelector(".deleteReview")
    .getAttribute("data-id");

  const response = await fetch(`/api/review/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      review_id,
    }),
  });

  if (response.ok) {
    localStorage.setItem("toast", "Review has been deleted!");
    document.location.replace("/");
  } else {
    localStorage.setItem("toast", "Failed to delete review.");
    toastIt(true);
  }
};

document.querySelector(".deleteReview").addEventListener("click", deleteReview);

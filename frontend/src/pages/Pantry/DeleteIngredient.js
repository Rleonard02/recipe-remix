export const deleteIngredientFromPantry = async (ingredient) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
          }
          const response = await fetch('http://localhost:8080/user/delete-pantry',
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`  // Add this line to include the token in the request header
                },
                body: JSON.stringify({ ingredientName: ingredient })  // Sending the ingredient data
              });
              const data = await response.json();
              if (response.ok) {
                  console.log(data.message); // Ingredient deleted successfully
              } else {
                  console.error(data.error);
              }
          } catch (error) {
              console.error("Error deleting ingredient to pantry:", error);
          }
        };
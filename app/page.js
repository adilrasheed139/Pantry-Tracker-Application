"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { addItem, deleteItem, getItems, uploadImage, classifyImage } from './firestoreService';
import { getRecipes } from './recipeService';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const userId = 'sampleUserId';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [image, setImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("Fetching items...");
        const fetchedItems = await getItems(userId);
        console.log("Items fetched:", fetchedItems);
        setItems(fetchedItems);
        fetchRecipes(fetchedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const fetchRecipes = async (items) => {
    try {
      const itemNames = items.map(item => item.name).join(', ');
      console.log("Fetching recipes for ingredients:", itemNames);
      const fetchedRecipes = await getRecipes(itemNames);
      console.log("Fetched recipes:", fetchedRecipes);
      setRecipes(fetchedRecipes || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
  };

  const handleAddItem = async () => {
    if (newItem.trim()) {
      try {
        let imageUrl = '';
        let classifications = [];
        if (image) {
          console.log("Uploading image...");
          imageUrl = await uploadImage(image);
          console.log("Image URL:", imageUrl);
          console.log("Classifying image...");
          classifications = await classifyImage(imageUrl);
          console.log("Image classifications:", classifications);
        }
        console.log("Adding item with data:", { name: newItem, imageUrl, classifications });
        await addItem({ name: newItem, imageUrl, classifications }, userId);
        setNewItem('');
        setImage(null);
        console.log("Fetching updated items...");
        const fetchedItems = await getItems(userId);
        console.log("Updated items:", fetchedItems);
        setItems(fetchedItems);
        fetchRecipes(fetchedItems);
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      console.log("Deleting item with ID:", id);
      await deleteItem(id);
      console.log("Fetching updated items...");
      const fetchedItems = await getItems(userId);
      console.log("Updated items:", fetchedItems);
      setItems(fetchedItems);
      fetchRecipes(fetchedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={2}
    >
      <Box
        width="800px"
        padding={2}
        bgcolor="#ADD8E6"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="8px"
        boxShadow={3}
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Typography variant="h2" color="#333" textAlign="center" fontWeight="400">
          Pantry App
        </Typography>
      </Box>
      <Box width="800px" mt={6}>
        <TextField
          label="Add New Item"
          variant="outlined"
          fullWidth
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginTop: '10px' }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleAddItem} sx={{ mt: 2 }}>
          Add Item
        </Button>
      </Box>
      <Box width="800px" mt={2}>
        <TextField
          label="Search Items"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Grid container spacing={2} width="800px" mt={2}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" color="#333" textAlign="center" fontWeight="300">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Typography>
                {item.imageUrl && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.imageUrl}
                    alt={item.name}
                    style={{ marginTop: '10px' }}
                  />
                )}
                {item.imageUrl && (
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => handleOpenModal(item)}
                    sx={{ mt: 2 }}
                  >
                    Classification
                  </Button>
                )}
              </CardContent>
              <CardActions>
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteItem(item.id)}
                  sx={{ ml: 'auto' }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box width="800px" mt={4}>
        <Typography variant="h4" textAlign="center" mb={2}>
          Suggested Recipes
        </Typography>
        {recipes && recipes.length > 0 ? (
          <Grid container spacing={2}>
            {recipes.map((recipe, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  {recipe.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={recipe.image}
                      alt={recipe.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {recipe.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={recipe.url} target="_blank" rel="noopener noreferrer">
                      View Recipe
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" textAlign="center">No recipes found.</Typography>
        )}
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          width="400px"
          bgcolor="background.paper"
          p={4}
          borderRadius="8px"
          boxShadow={3}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          bottom="2%"
          left="50%"
          marginLeft="-150px"
          transform="translate(-50%, -50%)"
        >
          <IconButton
            color="secondary"
            onClick={handleCloseModal}
            sx={{ position: 'absolute', top: 16, right: 16 }}
          >
            <CloseIcon />
          </IconButton>
          {selectedItem && (
            <>
              <Typography variant="h5" color="#333" textAlign="center" fontWeight="300">
                {selectedItem.name.charAt(0).toUpperCase() + selectedItem.name.slice(1)}
              </Typography>
              {selectedItem.imageUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  style={{ marginTop: '10px', borderRadius: '8px' }}
                />
              )}
              {selectedItem.classifications && selectedItem.classifications.length > 0 && (
                <Box mt={2}>
                  <Typography variant="body2" color="#333">
                    Classifications:
                  </Typography>
                  <ul>
                    {selectedItem.classifications.map((concept, index) => (
                      <li key={index}>{concept.name} ({(concept.value * 100).toFixed(2)}%)</li>
                    ))}
                  </ul>
                </Box>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

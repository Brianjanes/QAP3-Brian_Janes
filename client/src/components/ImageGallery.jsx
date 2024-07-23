import React, { useState } from "react";
import Modal from "./Modal";

const ImageGallery = ({ images }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Dog ${index + 1}`}
          className="dog-image"
          onClick={() => openModal(image)}
        />
      ))}
      <Modal isOpen={modalOpen} onClose={closeModal} imageUrl={selectedImage} />
    </div>
  );
};

export default ImageGallery;

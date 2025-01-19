import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

Modal.setAppElement("#root");

const ProfileModal = ({ selectedPet, onClose }) => {
    return (
        <Modal
            isOpen={selectedPet ? true : false}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="overlay"
        >
            <div className='cross-icon-container' onClick={onClose}>
                <IoClose size={24} />
            </div>
            {selectedPet &&
                <div className="profile-content">
                    <div className="pet-info">
                        <div className="pet-images">
                            <img src={selectedPet.pictures[0]} alt={`Pet Image`} />
                        </div>
                        <div className="pet-details">
                            <h2>{selectedPet.name}</h2>
                            <p><strong>Species:</strong> {selectedPet.species}</p>
                            <p><strong>Breed:</strong> {selectedPet.breed}</p>
                            <p><strong>Age:</strong> {selectedPet.age} years old</p>
                            <p><strong>Personality:</strong> {selectedPet.personality}</p>
                        </div>
                    </div>

                    <div className="owner-info">
                        <h3>Owner's Info</h3>
                        <div className="owner-details">
                            <img src={selectedPet.owner.profilePic} alt={selectedPet.owner.name || selectedPet.owner.username} className="owner-profile-pic" />
                            <div className="owner-text">
                                <h4>{selectedPet.owner.name || selectedPet.owner.username}</h4>
                                <p>{selectedPet.owner.aboutMe}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Modal>
    )
};

export default ProfileModal;

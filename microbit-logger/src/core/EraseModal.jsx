export const EraseModal = ({ microbit }) => {
    console.log(microbit);

    const handleYesButtonClick = async (event) => {
        const modal = document.querySelector(".modal");
        const overlay = document.querySelector(".overlay");

        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        microbit.sendErase();
    }

    const handleNoButtonClick = async (event) => {
        const modal = document.querySelector(".modal");
        const overlay = document.querySelector(".overlay");

        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    }


    return <div class="eraseModal"> 
    <section class="hidden modal">
        
        <div>
            <p>
                    You are about to erase all data from the following device's memory:<br /><br />{microbit.name}<br /><br />Are you sure you want to continue?
            </p>
        </div>
            <div>
            <button class="modal-button" onClick={(event) => handleNoButtonClick(event)}>No</button>
            <button class="modal-button" onClick={(event) => handleYesButtonClick(event)}>Yes</button>
            </div>
        </section>

    <div class="hidden overlay"></div>
    </div>
}

export default EraseModal
export default function ModalShowDetailsPreStorageType({
  modalContenData,
  closeModal,
}) {
  return (
    <>
      <input
        type="checkbox"
        id="modal_details_pre_storage_type"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box ">
          <div className="mb-6 flex flex-row space-x-4">
            <h3 className="text-lg font-bold">Details for:</h3>
            <p className="text-lg">{modalContenData.name} </p>
          </div>

          <div>
            {modalContenData ? (
              <ul className="space-y-2">
                <li className="row flex flex-row space-x-2">
                  <p className="font-bold">Name:</p>
                  <p>{modalContenData.name}</p>
                </li>

                <li className="row flex flex-row space-x-2">
                  <p className="font-bold">Surface Area:</p>
                  <p>{`${modalContenData.surfaceArea} m²`}</p>
                </li>

                <li className="row flex flex-row space-x-2">
                  <p className="font-bold">Pre-Storage For:</p>
                  <p>{`${modalContenData.preStorageFor}`}</p>
                </li>
              </ul>
            ) : (
              <p>No details available</p>
            )}
          </div>

          <div className="modal-action">
            <label
              htmlFor="modal_details_pre_storage_type"
              className="btn"
              onClick={closeModal}
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

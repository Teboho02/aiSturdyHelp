

async function upload(name, mark) {
    try {
        const docRef = await addDoc(collection(db, "modules"), {
            name: name,
            mark: mark,
            module: currentModule
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


async function fetchMarks() {
    try {
        const querySnapshot = await getDocs(collection(db, "modules"));
        marksData = {};
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const module = data.module;
            if (!marksData[module]) {
                marksData[module] = [];
            }
            marksData[module].push({ name: data.name, mark: data.mark });
        });
        renderModules();
    } catch (e) {
        console.error("Error fetching documents: ", e);
    }
}

addAssessmentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('assessment-name').value;
    const mark = parseInt(document.getElementById('assessment-mark').value);

    upload(name, mark);

    if (!marksData[currentModule]) {
        marksData[currentModule] = [];
    }
    marksData[currentModule].push({ name, mark });
    renderMarksTable();
    addAssessmentForm.reset();
});


// Initialize
renderModules();
fetchMarks();

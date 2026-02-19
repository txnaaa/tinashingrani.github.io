//BURGER MENU FUNCTIONALITY
const burgerToggle = document.getElementById('burgerToggle');
const burgerMenu = document.querySelector('.burger-menu');

if (burgerToggle && burgerMenu) {
  burgerToggle.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
  });

  //Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target)) {
      burgerMenu.classList.remove('active');
    }
  });
}

const projectButtons = document.querySelectorAll('.project-btn');
const projectSections = document.querySelectorAll('.project-content');

/**
//Switch between different projects (Catchee, Portfolio, Bikini Bottom)
 * @param {string} projectId - The ID of the project to display
 */
function switchProject(projectId) {
  //Hide all project sections
  projectSections.forEach(section => {
    section.classList.remove('active');
  });

  //Remove active class from all project buttons
  projectButtons.forEach(btn => {
    btn.classList.remove('active');
  });

  //Show selected project
  const selectedProject = document.getElementById(projectId);
  if (selectedProject) {
    selectedProject.classList.add('active');
  }

  //Add active class to clicked button
  const activeButton = document.querySelector(`[data-project="${projectId}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }

  //Reset to first learning outcome when switching projects
  const firstLOInProject = selectedProject?.querySelector('.lo-btn');
  if (firstLOInProject) {
    const firstOutcomeId = firstLOInProject.getAttribute('data-outcome');
    switchLearningOutcome(firstOutcomeId, selectedProject);
  }
}

//Add click listeners to project buttons
projectButtons.forEach(button => {
  button.addEventListener('click', () => {
    const projectId = button.getAttribute('data-project');
    switchProject(projectId);
  });
});

/**
 * Switch between learning outcomes within a project
 * @param {string} outcomeId - The ID of the learning outcome to display
 * @param {HTMLElement} projectSection - The project section containing the learning outcomes
 */
function switchLearningOutcome(outcomeId, projectSection) {
  if (!projectSection) return;

  //Hide all learning outcome sections in this project
  const allLOSections = projectSection.querySelectorAll('.learning-outcome-section');
  allLOSections.forEach(section => {
    section.classList.remove('active');
  });

  //Remove active class from all LO buttons in this project
  const allLOButtons = projectSection.querySelectorAll('.lo-btn');
  allLOButtons.forEach(btn => {
    btn.classList.remove('active');
  });

  //Show selected learning outcome
  const selectedOutcome = document.getElementById(outcomeId);
  if (selectedOutcome) {
    selectedOutcome.classList.add('active');
  }

  //Add active class to clicked button
  const activeButton = projectSection.querySelector(`[data-outcome="${outcomeId}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }

  //Smooth scroll to top of content
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

//Add click listeners to all learning outcome buttons
document.querySelectorAll('.lo-btn').forEach(button => {
  button.addEventListener('click', () => {
    const outcomeId = button.getAttribute('data-outcome');
    const projectSection = button.closest('.project-content');
    switchLearningOutcome(outcomeId, projectSection);
  });
});

function handleURLParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectParam = urlParams.get('project');
  
  //Map URL parameters to project IDs
  const projectMap = {
    'catchee': 'project1',
    'portfolio': 'project2',
    'bikini': 'project3'
  };
  
  if (projectParam && projectMap[projectParam]) {
    switchProject(projectMap[projectParam]);
  } else {
    //Default to first project if no parameter
    initializePage();
  }
}

function initializePage() {
  //Ensure first project and first learning outcome are active
  const firstProject = document.querySelector('.project-content.active');
  if (firstProject) {
    const firstLO = firstProject.querySelector('.learning-outcome-section');
    if (firstLO) {
      firstLO.classList.add('active');
    }
  }
}

//Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleURLParameters);
} else {
  handleURLParameters();
}
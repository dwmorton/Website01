document.addEventListener('DOMContentLoaded', () => {
  const playerList = document.querySelector('.player-list');
  if (!playerList) return;

  const budget = Number(playerList.dataset.budget || 0);
  const spendEl = document.getElementById('spend-total');
  const leftEl = document.getElementById('budget-left');
  const countEl = document.getElementById('selected-count');

  const checkboxes = Array.from(playerList.querySelectorAll('input[type="checkbox"]'));

  function getSelected() {
    return checkboxes.filter((box) => box.checked);
  }

  function calculateSpend(selected) {
    return selected.reduce((sum, box) => sum + Number(box.dataset.value || 0), 0);
  }

  function updateUi() {
    const selected = getSelected();
    const spend = calculateSpend(selected);
    const budgetLeft = budget - spend;

    if (spendEl) spendEl.textContent = spend.toFixed(1);
    if (leftEl) leftEl.textContent = budgetLeft.toFixed(1);
    if (countEl) countEl.textContent = selected.length;

    const limitReached = selected.length >= 11;
    const gkSelected = selected.filter(b => b.dataset.position === 'GK');
    const hasGoalkeeper = gkSelected.length > 0;

    checkboxes.forEach((box) => {
      if (!box.checked) {
        const isGoalkeeper = box.dataset.position === 'GK';
        if (isGoalkeeper && hasGoalkeeper) {
          box.disabled = true;
        } else {
          box.disabled = limitReached;
        }
      } else {
        box.disabled = false;
      }
    });
  }

  checkboxes.forEach((box) => {
    box.addEventListener('change', () => {
      const selected = getSelected();
      const spend = calculateSpend(selected);

      if (selected.length > 11) {
        box.checked = false;
        return;
      }

      if (spend > budget) {
        box.checked = false;
        alert('Selection exceeds the £' + budget + 'm budget.');
        return;
      }

      const position = box.dataset.position;
      if (position === 'GK') {
        const gkSelected = selected.filter(b => b.dataset.position === 'GK');
        if (gkSelected.length > 1) {
          box.checked = false;
          alert('You can only select one goalkeeper.');
          updateUi();
          return;
        }
      }

      updateUi();
    });
  });

  updateUi();
});


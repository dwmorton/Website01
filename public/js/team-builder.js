document.addEventListener('DOMContentLoaded', () => {
  const playerList = document.querySelector('.player-list');
  if (!playerList) return;

  const budget = Number(playerList.dataset.budget || 0);
  const spendEl = document.getElementById('spend-total');
  const leftEl = document.getElementById('budget-left');
  const countEl = document.getElementById('selected-count');
  const saveButton = document.getElementById('save-button');

  const checkboxes = Array.from(playerList.querySelectorAll('input[type="checkbox"]'));

  // Position limits: min and max
  const positionLimits = {
    GK: { min: 1, max: 1 },
    DF: { min: 1, max: 4 },
    MF: { min: 1, max: 4 },
    FW: { min: 1, max: 4 }
  };

  function getSelected() {
    return checkboxes.filter((box) => box.checked);
  }

  function calculateSpend(selected) {
    return selected.reduce((sum, box) => sum + Number(box.dataset.value || 0), 0);
  }

  function getPositionCounts(selected) {
    return {
      GK: selected.filter(b => b.dataset.position === 'GK').length,
      DF: selected.filter(b => b.dataset.position === 'DF').length,
      MF: selected.filter(b => b.dataset.position === 'MF').length,
      FW: selected.filter(b => b.dataset.position === 'FW').length
    };
  }

  function updatePositionCounts(counts) {
    Object.keys(counts).forEach(pos => {
      const countEl = document.getElementById(`count-${pos.toLowerCase()}`);
      if (countEl) {
        countEl.textContent = counts[pos];
      }
    });
  }

  function validateSquad(selected, counts) {
    // Check total players
    if (selected.length !== 11) {
      return false;
    }

    // Check position minimums and maximums
    for (const [pos, limits] of Object.entries(positionLimits)) {
      if (counts[pos] < limits.min || counts[pos] > limits.max) {
        return false;
      }
    }

    // Check budget
    const spend = calculateSpend(selected);
    if (spend > budget) {
      return false;
    }

    return true;
  }

  function updateUi() {
    const selected = getSelected();
    const spend = calculateSpend(selected);
    const budgetLeft = budget - spend;
    const positionCounts = getPositionCounts(selected);

    if (spendEl) spendEl.textContent = spend.toFixed(1);
    if (leftEl) leftEl.textContent = budgetLeft.toFixed(1);
    if (countEl) countEl.textContent = selected.length;

    // Update position counts in group headers
    updatePositionCounts(positionCounts);

    // Enable/disable checkboxes based on position limits
    checkboxes.forEach((box) => {
      const position = box.dataset.position;
      const limits = positionLimits[position];
      const currentCount = positionCounts[position];
      const isChecked = box.checked;

      if (isChecked) {
        // Can always uncheck
        box.disabled = false;
      } else {
        // Check if we can select more of this position
        if (currentCount >= limits.max) {
          box.disabled = true;
        } else if (selected.length >= 11) {
          // Total limit reached
          box.disabled = true;
        } else {
          box.disabled = false;
        }
      }
    });

    // Enable/disable Save button based on validation
    const isValid = validateSquad(selected, positionCounts);
    if (saveButton) {
      saveButton.disabled = !isValid;
    }
  }

  checkboxes.forEach((box) => {
    box.addEventListener('change', () => {
      const selected = getSelected();
      const spend = calculateSpend(selected);
      const position = box.dataset.position;
      const positionCounts = getPositionCounts(selected);
      const limits = positionLimits[position];

      // Check total player limit
      if (selected.length > 11) {
        box.checked = false;
        alert('You can only select exactly 11 players.');
        updateUi();
        return;
      }

      // Check budget
      if (spend > budget) {
        box.checked = false;
        alert('Selection exceeds the £' + budget + 'm budget.');
        updateUi();
        return;
      }

      // Check position maximum
      if (positionCounts[position] > limits.max) {
        box.checked = false;
        const positionName = position === 'GK' ? 'Goalkeeper' : 
                            position === 'DF' ? 'Defender' :
                            position === 'MF' ? 'Midfielder' : 'Forward';
        alert(`You can only select up to ${limits.max} ${positionName}${limits.max > 1 ? 's' : ''}.`);
        updateUi();
        return;
      }

      updateUi();
    });
  });

  updateUi();
});

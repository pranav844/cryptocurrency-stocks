function fetchCryptoDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => renderCryptoTable(data));
  }

  async function fetchCryptoDataWithAsyncAwait() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();
    renderCryptoTable(data);
  }

  function renderCryptoTable(data) {
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = '';

    data.forEach(crypto => {
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td>${crypto.name}</td>
        <td>${crypto.symbol}</td>
        <td>${crypto.current_price}</td>
        <td>${crypto.total_volume}</td>
      `;
    });
  }

  function sortMarketCap() {
    const tableBody = document.getElementById('cryptoTableBody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((a, b) => {
      const priceA = parseFloat(a.cells[2].textContent);
      const priceB = parseFloat(b.cells[2].textContent);
      return priceB - priceA;
    });

    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));
  }

  function sortPercentageChange() {
    const tableBody = document.getElementById('cryptoTableBody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((a, b) => {
      const volumeA = parseFloat(a.cells[3].textContent);
      const volumeB = parseFloat(b.cells[3].textContent);
      return volumeB - volumeA;
    });

    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));
  }

  document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = document.getElementById('cryptoTableBody').getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
      const name = row.getElementsByTagName('td')[0].textContent.toLowerCase();
      const symbol = row.getElementsByTagName('td')[1].textContent.toLowerCase();
      if (name.includes(searchTerm) || symbol.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });

  fetchCryptoDataWithThen(); // Fetch data when the page loads
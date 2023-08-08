import { TatumSDK, Network } from "@tatumio/tatum";

const button = document.getElementById("button");
const blockNumberInput = document.getElementById("blockNumber");
const resultDiv = document.getElementById("result");

button.addEventListener("click", async () => {
  // parse blockNumber
  const blockNumber = parseInt(blockNumberInput.value);

  // initialise sdk to bitcoin & get block hash
  const tatum = await TatumSDK.init({ network: Network.BITCOIN });
  const result = await tatum.rpc.getBlockHash(blockNumber);
  console.log(result);

  // get transactions from getblock endpoint by passing hash we just got
  const txs = await tatum.rpc.getBlock(result, 1);
  resultDiv.textContent = JSON.stringify(txs["tx"], null, 2);

  // represent in a table and push in the preformatted text tag in html
  const table = document.createElement("table");
  const headerRow = document.createElement("tr");
  const header = document.createElement("th");
  header.textContent = "Transactions";
  headerRow.appendChild(header);
  table.appendChild(headerRow);
  for (let tx of txs["tx"]) {
    const row = document.createElement("tr");
    const data = document.createElement("td");
    data.textContent = tx;
    row.appendChild(data);
    table.appendChild(row);
  }
  resultDiv.appendChild(table);
});

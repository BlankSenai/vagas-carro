const vehicles = JSON.parse(localStorage.getItem('vehicles'))

const reservedSpaces = JSON.parse(localStorage.getItem('reservedSpaces'))

const freeSpaces = JSON.parse(localStorage.getItem('freeSpaces'))

if (!freeSpaces) {
  console.log('tava vazio e foi reposto')

  const freeSpaces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  localStorage.setItem('freeSpaces', JSON.stringify(freeSpaces))
}

function loadInfo() {
  const freeSpacesContainer = document.querySelector('.free-spaces-container')

  if (freeSpaces) {
    freeSpaces.forEach((space) => {
      const freeSpaceDiv = document.createElement('div')

      freeSpaceDiv.classList.add('free-space')

      const spaceH1 = document.createElement('h1')
      spaceH1.textContent = 'Vaga'

      const numberH1 = document.createElement('h1')
      numberH1.textContent = space

      freeSpaceDiv.appendChild(spaceH1)
      freeSpaceDiv.appendChild(numberH1)

      freeSpacesContainer.appendChild(freeSpaceDiv)
    })
  }

  const reservedSpacesContainer = document.querySelector('.reserved-spaces-container')

  if (reservedSpaces) {
    reservedSpaces.forEach((space) => {
      const reservedSpaceDiv = document.createElement('div')

      reservedSpaceDiv.classList.add('reserved-space')

      const spaceNumber = document.createElement('h1')
      spaceNumber.textContent = `Vaga ${space.spaceNumber}`

      const plate = document.createElement('p')
      plate.textContent = `${space.plate}`

      const aptBlock = document.createElement('p')
      aptBlock.textContent = `Bloco ${space.aptBlock}`

      const aptNumber = document.createElement('p')
      aptNumber.textContent = `Apt. ${space.aptNumber}`

      reservedSpaceDiv.appendChild(spaceNumber)
      reservedSpaceDiv.appendChild(plate)
      reservedSpaceDiv.appendChild(aptBlock)
      reservedSpaceDiv.appendChild(aptNumber)

      reservedSpacesContainer.appendChild(reservedSpaceDiv)
    })
  }
}

function loadFormData() {
  const licensePlateSelect = document.querySelector('#licensePlateSelect')

  if (!vehicles) {
    licensePlateSelect.addEventListener('mousedown', () => {
      alert('Nenhum veículo foi cadastrado.')
    })
  } else {
    vehicles.forEach(vehicle => {
      const option = document.createElement('option')
      option.text = vehicle.plate.toUpperCase()
      option.value = vehicle.plate.toUpperCase()

      licensePlateSelect.appendChild(option)
    })
  }

  const spaceNumberSelect = document.querySelector('#spaceNumberSelect')

  freeSpaces.forEach((space) => {
    const option = document.createElement('option')
    option.text = space
    option.value = space

    spaceNumberSelect.appendChild(option)
  })
}

function reserveSpace() {
  const plate = document.querySelector('#licensePlateSelect')
  const aptNumber = document.querySelector('#aptNumberSelect')
  const aptBlock = document.querySelector('#aptBlockSelect')
  const spaceNumber = document.querySelector('#spaceNumberSelect')

  if (!plate.value || !aptNumber.value || !aptBlock.value || !spaceNumber.value) {
    alert('Preencha todos os campos.')
  } else {
    const reservedSpace = {
      plate: plate.value,
      aptNumber: aptNumber.value,
      aptBlock: aptBlock.value,
      spaceNumber: spaceNumber.value
    }

    if (reservedSpaces) {
      reservedSpaces.push(reservedSpace)

      localStorage.setItem('reservedSpaces', JSON.stringify(reservedSpaces))
    } else {
      const reservedSpaces = []

      reservedSpaces.push(reservedSpace)

      localStorage.setItem('reservedSpaces', JSON.stringify(reservedSpaces))
    }

    const freeSpaces = JSON.parse(localStorage.getItem('freeSpaces'))

    const index = freeSpaces.indexOf(Number(reservedSpace.spaceNumber))

    freeSpaces.splice(index, 1)

    localStorage.setItem('freeSpaces', JSON.stringify(freeSpaces))

    window.location.reload()
  }
}

function registerVehicle() {
  const plate = document.querySelector('#licensePlateInput')
  const owner = document.querySelector('#ownerInput')
  const model = document.querySelector('#vehicleModelInput')
  const color = document.querySelector('#vehicleColorInput')

  if (!plate.value || !owner.value || !model.value || !color.value) {
    alert('Preencha todos os campos.')
  } else {
    const vehicle = {
      plate: plate.value,
      owner: owner.value,
      model: model.value,
      color: color.value
    }

    if (vehicles) {
      vehicles.push(vehicle)

      localStorage.setItem('vehicles', JSON.stringify(vehicles))
    } else {
      const vehicles = []

      vehicles.push(vehicle)

      localStorage.setItem('vehicles', JSON.stringify(vehicles))
    }

    window.location.reload()
  }
}
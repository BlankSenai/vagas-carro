const vehicles = JSON.parse(localStorage.getItem('vehicles'))

const reservedSpaces = JSON.parse(localStorage.getItem('reservedSpaces'))

const freeSpaces = JSON.parse(localStorage.getItem('freeSpaces'))

if (!freeSpaces) {
  console.log('tava vazio e foi reposto')

  const freeSpaces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  localStorage.setItem('freeSpaces', JSON.stringify(freeSpaces))
}

function deleteData(element, id, type) {
  for (const div of element.children) {
    if (div.dataset.key === id) {
      element.removeChild(div)

      if (type === 'space') {
        const filteredReservedSpaces = reservedSpaces.filter(reservedSpace => reservedSpace.id !== id)
        const currentReservedSpace = reservedSpaces.filter(reservedSpace => reservedSpace.id === id)
  
        localStorage.setItem('reservedSpaces', JSON.stringify(filteredReservedSpaces))
        
        freeSpaces.unshift(currentReservedSpace[0].spaceNumber)
  
        localStorage.setItem('freeSpaces', JSON.stringify(freeSpaces))
      } else if (type === 'vehicle') {
        const filteredVehicles = vehicles.filter(vehicle => vehicle.id !== id)

        localStorage.setItem('vehicles', JSON.stringify(filteredVehicles))
      }

      window.location.reload()
    }
  }
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
      reservedSpaceDiv.dataset.key = space.id

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

      const deleteBtn = document.createElement('span')
      deleteBtn.classList.add('material-icons')
      deleteBtn.textContent = 'delete'
      deleteBtn.dataset.key = space.id

      deleteBtn.addEventListener('click', () => {
        deleteData(reservedSpacesContainer, deleteBtn.dataset.key, 'space')
      })

      const editBtn = document.createElement('span')
      editBtn.classList.add('material-icons')
      editBtn.textContent = 'edit'

      reservedSpaceDiv.appendChild(deleteBtn)
      reservedSpaceDiv.appendChild(editBtn)

      reservedSpacesContainer.appendChild(reservedSpaceDiv)
    })
  }

  const vehiclesContainer = document.querySelector('.vehicles-container')

  if (vehicles) {
    vehicles.forEach((vehicle) => {
      const vehicleDiv = document.createElement('div')
      vehicleDiv.classList.add('vehicle')
      vehicleDiv.dataset.key = vehicle.id

      const plateH2 = document.createElement('h2')
      plateH2.textContent = vehicle.plate

      const ownerP = document.createElement('p')
      ownerP.textContent = vehicle.owner

      const modelP = document.createElement('p')
      modelP.textContent = vehicle.model

      const colorP = document.createElement('p')
      colorP.textContent = vehicle.color

      vehicleDiv.appendChild(plateH2)
      vehicleDiv.appendChild(ownerP)
      vehicleDiv.appendChild(modelP)
      vehicleDiv.appendChild(colorP)

      const deleteBtn = document.createElement('span')
      deleteBtn.classList.add('material-icons')
      deleteBtn.textContent = 'delete'
      deleteBtn.dataset.key = vehicle.id

      deleteBtn.addEventListener('click', () => {
        deleteData(vehiclesContainer, deleteBtn.dataset.key, 'vehicle')
      })

      const editBtn = document.createElement('span')
      editBtn.classList.add('material-icons')
      editBtn.textContent = 'edit'

      vehicleDiv.appendChild(deleteBtn)
      vehicleDiv.appendChild(editBtn)

      vehiclesContainer.appendChild(vehicleDiv)
    })
  }
}

function loadFormData() {
  const licensePlateSelect = document.querySelector('#licensePlateSelect')

  if (!vehicles || vehicles.length === 0) {
    licensePlateSelect.addEventListener('mousedown', () => {
      alert('Nenhum veículo foi cadastrado.')
    })
  } else {
    vehicles.forEach(vehicle => {
      const option = document.createElement('option')
      option.text = vehicle.plate
      option.value = vehicle.plate

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
    const id = crypto.randomUUID()

    const reservedSpace = {
      id: id,
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
    const id = crypto.randomUUID()

    const vehicle = {
      id: id,
      plate: plate.value.toUpperCase(),
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
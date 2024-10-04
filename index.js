const apiURL = 'http://localhost:3333'

const isLogged = JSON.parse(localStorage.getItem('isLogged'))
if (isLogged === null || isLogged === undefined) {
  isLogged = false
  localStorage.setItem('isLogged', JSON.stringify(isLogged))
}

function redirect() {
  const isLogged = JSON.parse(localStorage.getItem('isLogged'))

  if (!isLogged) {
    window.location.replace('login.html')
  }
}

function login() {
  
}

function signup() {

}

async function getVehicles() {
  const response = await fetch(`${apiURL}/vehicles`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
  const vehicles = await response.json()

  return vehicles
}

async function getSpaces() {
  const response = await fetch(`${apiURL}/spaces`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
  const spaces = await response.json()

  return spaces
}

function editData(id) {
  const overlay = document.querySelector('.overlay')
  const modal = document.querySelector('.modal')

  overlay.style.display = 'flex'
  modal.style.display = 'flex'

  modal.classList.add('zoom-in')

  const plateLabel = document.createElement('label')
  plateLabel.textContent = 'Placa do veículo:'
  const plateInput = document.createElement('input')
  plateInput.classList.add('input')

  modal.appendChild(plateLabel)
  modal.appendChild(plateInput)

  const ownerLabel = document.createElement('label')
  ownerLabel.textContent = 'Proprietário:'
  const ownerInput = document.createElement('input')
  ownerInput.classList.add('input')

  modal.appendChild(ownerLabel)
  modal.appendChild(ownerInput)

  const modelLabel = document.createElement('label')
  modelLabel.textContent = 'Modelo do veículo:'
  const modelInput = document.createElement('input')
  modelInput.classList.add('input')

  modal.appendChild(modelLabel)
  modal.appendChild(modelInput)

  const colorLabel = document.createElement('label')
  colorLabel.textContent = 'Cor do veículo:'
  const colorInput = document.createElement('input')
  colorInput.classList.add('input')

  modal.appendChild(colorLabel)
  modal.appendChild(colorInput)

  const btnDiv = document.createElement('div')

  const submitBtn = document.createElement('button')
  submitBtn.classList.add('form-btn')
  submitBtn.textContent = 'Confirmar'

  submitBtn.addEventListener('click', () => {
    if (!plateInput.value || !ownerInput.value || !modelInput.value || !colorInput.value) {
      alert('Preencha todos os campos.')
    } else {
      const updatedData = {
        vehicle: {
          placa: plateInput.value.toUpperCase(),
          dono: ownerInput.value,
          modelo: modelInput.value,
          cor: colorInput.value
        },
        id: id
      }

      fetch(`${apiURL}/vehicles`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      })

      window.location.reload()

    }
  })

  const cancelBtn = document.createElement('button')
  cancelBtn.classList.add('form-btn')
  cancelBtn.textContent = 'Cancelar'

  cancelBtn.addEventListener('click', () => {
    window.location.reload()
  })

  btnDiv.appendChild(submitBtn)
  btnDiv.appendChild(cancelBtn)

  modal.appendChild(btnDiv)
}

function deleteData(element, id, type) {
  for (const div of element.children) {
    if (div.dataset.key === id) {
      element.removeChild(div)

      if (type === 'space') {
        const deleteData = {
          space: {
            status: 'Livre',
            placa: null,
            numeroAp: null,
            blocoAp: null
          },
          id: id
        }

        fetch(`${apiURL}/spaces`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(deleteData)
        })
      } else if (type === 'vehicle') {
        const deleteId = {
          id: id
        }

        fetch(`${apiURL}/vehicles`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(deleteId)
        })
      }

      window.location.reload()
    }
  }
}

function loadInfo() {
  getSpaces().then(spaces => {
    const spacesContainer = document.querySelector('.spaces-container')
    
    spaces.forEach((space) => {
      const spaceDiv = document.createElement('div')
      spaceDiv.classList.add('space')
      spaceDiv.dataset.key = space.id
      
      const spaceNumber = document.createElement('h1')
      spaceNumber.textContent = `Vaga ${space.numeroVaga}`
      
      const spaceStatus = document.createElement('h2')
      spaceStatus.textContent = space.status
      
      spaceDiv.appendChild(spaceNumber)
      spaceDiv.appendChild(spaceStatus)

      if (space.status === 'Ocupada') {
        const spacePlate = document.createElement('p')
        spacePlate.textContent = space.placa

        const spaceApNumber = document.createElement('p')
        spaceApNumber.textContent = space.numeroAp

        const spaceBlock = document.createElement('p')
        spaceBlock.textContent = space.blocoAp

        spaceDiv.appendChild(spacePlate)
        spaceDiv.appendChild(spaceApNumber)
        spaceDiv.appendChild(spaceBlock)

        const deleteBtn = document.createElement('span')
        deleteBtn.classList.add('material-icons')
        deleteBtn.textContent = 'delete'
        deleteBtn.dataset.key = space.id
  
        deleteBtn.addEventListener('click', () => {
          deleteData(spacesContainer, deleteBtn.dataset.key, 'space')
        })
  
        spaceDiv.appendChild(deleteBtn)
      }

      spacesContainer.appendChild(spaceDiv)

    })
  })

  getVehicles().then(vehicles => {
    const vehiclesContainer = document.querySelector('.vehicles-container')
    
    vehicles.forEach((vehicle) => {
      const vehicleDiv = document.createElement('div')
      vehicleDiv.classList.add('vehicle')
      vehicleDiv.dataset.key = vehicle.id
  
      const plateH2 = document.createElement('h2')
      plateH2.textContent = vehicle.placa
  
      const ownerP = document.createElement('p')
      ownerP.textContent = vehicle.dono
  
      const modelP = document.createElement('p')
      modelP.textContent = vehicle.modelo
  
      const colorP = document.createElement('p')
      colorP.textContent = vehicle.cor
  
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
  
      editBtn.addEventListener('click', () => {
        editData(vehicle.id, 'vehicle')
      })
  
      vehicleDiv.appendChild(deleteBtn)
      vehicleDiv.appendChild(editBtn)
  
      vehiclesContainer.appendChild(vehicleDiv)
    })
  })
}

function loadFormData() {
  
  getVehicles().then(vehicles => {
    const licensePlateSelect = document.querySelector('#licensePlateSelect')
    if (!vehicles || vehicles.length === 0) {
      licensePlateSelect.addEventListener('mousedown', () => {
        alert('Nenhum veículo foi cadastrado.')
      })
    } else {
      vehicles.forEach(vehicle => {
        const option = document.createElement('option')
        option.text = vehicle.placa
        option.value = vehicle.placa
  
        licensePlateSelect.appendChild(option)
      })
    }
  })

  getSpaces().then(spaces => {
    spaces.forEach((space) => {
      const spaceNumberSelect = document.querySelector('#spaceNumberSelect')
      const option = document.createElement('option')
      option.text = space.numeroVaga
      option.value = space.numeroVaga
  
      spaceNumberSelect.appendChild(option)
    })
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
    getSpaces().then(spaces => {
      const selectedSpace = spaces.filter(space => space.numeroVaga === Number(spaceNumber.value))

      const updatedSpace = {
        space: {  
          status: 'Ocupada',
          placa: plate.value.toUpperCase(),
          numeroAp: aptNumber.value,
          blocoAp: aptBlock.value,
        },
        id: selectedSpace[0].id
      }

      fetch(`${apiURL}/spaces`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updatedSpace)
      })
    })

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
      placa: plate.value.toUpperCase(),
      dono: owner.value,
      modelo: model.value,
      cor: color.value
    }

    fetch('http://localhost:3333/vehicles', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(vehicle)
    })

    window.location.reload()
  }
}
<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\Auth\DefaultPasswordHasher;
class LocationImage extends Entity
{

    
    protected $_accessible = [
        '*' => true,
        'id' => false,
    ];

  
   
}